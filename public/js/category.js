const categoryConfig = {
  ground: {
    title: "Ground Vehicles",
    description: "Explore land-based vehicles built for transport, combat, and utility."
  },
  air: {
    title: "Air Vehicles",
    description: "Browse aircraft designed for speed, reconnaissance, and aerial support."
  },
  water: {
    title: "Water Vehicles",
    description: "Discover naval and aquatic vehicles designed for patrol, transport, and combat."
  }
};

function getCategoryFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("type")?.toLowerCase() || "";
}

function formatCurrency(value) {
  const number = Number(value);
  if (Number.isNaN(number)) return value;
  return `$${number.toLocaleString()}`;
}

function renderVehicles(vehicles) {
  const grid = document.getElementById("vehicle-grid");
  const count = document.getElementById("category-count");

  if (!vehicles.length) {
    count.textContent = "0 vehicles found";
    grid.innerHTML = `
      <div class="empty-state">
        <h2>No vehicles found</h2>
        <p>There are currently no vehicles in this category.</p>
      </div>
    `;
    return;
  }

  count.textContent = `${vehicles.length} vehicle${vehicles.length === 1 ? "" : "s"} found`;

  grid.innerHTML = vehicles
    .map(
      (vehicle) => `
        <article class="vehicle-card">
          <div class="vehicle-card-top">
            <p class="vehicle-card-type">${vehicle.type || "Vehicle"}</p>
            <h2>${vehicle.name || "Unnamed Vehicle"}</h2>
          </div>

          <div class="vehicle-specs">
            <p><strong>Price:</strong> ${formatCurrency(vehicle.price)}</p>
            <p><strong>Block Count:</strong> ${vehicle.blockCount ?? "N/A"}</p>
            <p><strong>Top Speed:</strong> ${vehicle.topSpeed != null ? `${vehicle.topSpeed} mph` : "N/A"}</p>
            <p><strong>Crew Size:</strong> ${vehicle.crewSize ?? "N/A"}</p>
            <p><strong>Main Weapon:</strong> ${vehicle.mainWeapon || "None"}</p>
            <p><strong>Weight:</strong> ${vehicle.weight ? `${vehicle.weight.toLocaleString()} kg` : "N/A"}</p>
          </div>

          <div class="vehicle-card-actions">
            <a href="/vehicle-detail.html?id=${vehicle._id}">View Details</a>
          </div>
        </article>
      `
    )
    .join("");
}

async function loadCategoryPage() {
  const category = getCategoryFromUrl();

  const titleElement = document.getElementById("category-title");
  const descriptionElement = document.getElementById("category-description");
  const grid = document.getElementById("vehicle-grid");
  const count = document.getElementById("category-count");

  if (!categoryConfig[category]) {
    titleElement.textContent = "Category Not Found";
    descriptionElement.textContent = "The requested vehicle category does not exist.";
    count.textContent = "";
    grid.innerHTML = `
      <div class="empty-state">
        <h2>Invalid Category</h2>
        <p>Please select Ground, Air, or Water from the Vehicles menu.</p>
      </div>
    `;
    return;
  }

  titleElement.textContent = categoryConfig[category].title;
  descriptionElement.textContent = categoryConfig[category].description;

  try {
    const response = await fetch("/vehicles");
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const vehicles = await response.json();

    const filteredVehicles = vehicles.filter((vehicle) => {
      return vehicle.category?.toLowerCase() === category;
    });

    renderVehicles(filteredVehicles);
  } catch (error) {
    console.error("Failed to load vehicles:", error);
    count.textContent = "";
    grid.innerHTML = `
      <div class="empty-state">
        <h2>Unable to load vehicles</h2>
        <p>There was a problem fetching vehicle data from the API.</p>
      </div>
    `;
  }
}

loadCategoryPage();