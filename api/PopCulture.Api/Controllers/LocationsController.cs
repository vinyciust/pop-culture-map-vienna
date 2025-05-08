using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PopCulture.Api.Data;
using PopCulture.Api.Models;

namespace PopCulture.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationsController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly ILogger<LocationsController> _logger;

        public LocationsController(AppDbContext db, ILogger<LocationsController> logger)
        {
            _db     = db;
            _logger = logger;
        }

        /// <summary>
        /// Retorna todas as localidades.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<LocationDto>>> GetAll(CancellationToken ct)
        {
            _logger.LogInformation("Fetching all locations");

            var list = await _db.api_location
                .AsNoTracking()
                .Select(l => new LocationDto
                {
                    Id        = l.id,
                    Name      = l.name,
                    Latitude  = l.latitude,
                    Longitude = l.longitude
                })
                .ToListAsync(ct);

            return Ok(list);
        }

        /// <summary>
        /// Retorna uma localidade pelo ID.
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<LocationDto>> GetById(long id, CancellationToken ct)
        {
            _logger.LogInformation("Fetching location {Id}", id);

            var loc = await _db.api_location
                .AsNoTracking()
                .Where(l => l.id == id)
                .Select(l => new LocationDto
                {
                    Id        = l.id,
                    Name      = l.name,
                    Latitude  = l.latitude,
                    Longitude = l.longitude
                })
                .FirstOrDefaultAsync(ct);

            return loc is not null ? Ok(loc) : NotFound();
        }

            /// <summary>
    /// Cria uma nova localidade.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<ActionResult<LocationDto>> Create(CreateLocationDto dto, CancellationToken ct)
    {
        _logger.LogInformation("Creating new location");

        var entity = new api_location
        {
            name        = dto.Name,
            latitude    = dto.Latitude,
            longitude   = dto.Longitude,
            description = dto.Description,
            category    = dto.Category,
            image_url   = dto.ImageUrl,
            city        = dto.City,
            country     = dto.Country,
            origin      = dto.Origin
        };

        _db.api_location.Add(entity);
        await _db.SaveChangesAsync(ct);

        var resultDto = new LocationDto
        {
            Id        = entity.id,
            Name      = entity.name,
            Latitude  = entity.latitude,
            Longitude = entity.longitude
        };

        return CreatedAtAction(nameof(GetById), new { id = entity.id }, resultDto);
    }

    /// <summary>
    /// Atualiza uma localidade existente.
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(long id, UpdateLocationDto dto, CancellationToken ct)
    {
        _logger.LogInformation("Updating location {Id}", id);

        var entity = await _db.api_location.FindAsync(new object[] { id }, ct);
        if (entity == null) return NotFound();

        entity.name        = dto.Name;
        entity.latitude    = dto.Latitude;
        entity.longitude   = dto.Longitude;
        entity.description = dto.Description;
        entity.category    = dto.Category;
        entity.image_url   = dto.ImageUrl;
        entity.city        = dto.City;
        entity.country     = dto.Country;
        entity.origin      = dto.Origin;

        await _db.SaveChangesAsync(ct);
        return Ok();
    }



    }
}
