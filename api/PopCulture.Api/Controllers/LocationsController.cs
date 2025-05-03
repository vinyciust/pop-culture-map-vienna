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
            _db = db;
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
                .Select(l => new LocationDto {
                    Id = l.Id,
                    Name = l.Name,
                    Latitude = l.Latitude,
                    Longitude = l.Longitude
                })
                .ToListAsync(ct);

            return Ok(list);
        }

        /// <summary>
        /// Retorna uma localidade pelo ID.
        /// </summary>
        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<LocationDto>> GetById(int id, CancellationToken ct)
        {
            _logger.LogInformation("Fetching location {Id}", id);

            var loc = await _db.api_location
                .AsNoTracking()
                .Where(l => l.Id == id)
                .Select(l => new LocationDto {
                    Id = l.Id,
                    Name = l.Name,
                    Latitude = l.Latitude,
                    Longitude = l.Longitude
                })
                .FirstOrDefaultAsync(ct);

            return loc is not null ? Ok(loc) : NotFound();
        }
    }
}
