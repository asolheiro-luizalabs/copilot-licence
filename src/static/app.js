document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  // Function to fetch activities from API
  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();

      // Clear loading message
      activitiesList.innerHTML = "";

      // Populate activities list
      Object.entries(activities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";

        const spotsLeft = details.max_participants - details.participants.length;

        // Cria a lista de participantes formatadapantes formatada
        let participantsHTML = "";ML = "";
        if (details.participants.length > 0) { > 0) {
          participantsHTML = `
            <div class="participants-section">
              <strong>Participants:</strong>    <strong>Participants:</strong>
              <ul class="participants-list">              <ul class="participants-list">
                ${details.participants
                  .map(                  .map(
                    (email) =>
                      `<li><span class="participant-pill">${email}</span></li>`">${email}</span></li>`
                  )
                  .join("")}
              </ul>
            </div>   </div>
          `;
        } else {
          participantsHTML = `
            <div class="participants-section">       <div class="participants-section">
              <strong>Participants:</strong>           <strong>Participants:</strong>
              <span class="no-participants">No participants yet</span>              <span class="no-participants">No participants yet</span>
            </div>
          `;
        }

        activityCard.innerHTML = `
          <h4>${name}</h4>
          <p>${details.description}</p>          <p>${details.description}</p>
          <p><strong>Schedule:</strong> ${details.schedule}</p> <p><strong>Schedule:</strong> ${details.schedule}</p>
          <p><strong>Availability:</strong> ${spotsLeft} spots left</p>/strong> ${spotsLeft} spots left</p>
          ${participantsHTML}
        `;;

        activitiesList.appendChild(activityCard);ctivitiesList.appendChild(activityCard);

        // Add option to select dropdown        // Add option to select dropdown
        const option = document.createElement("option");nt("option");
        option.value = name;        option.value = name;
        option.textContent = name;nt = name;
        activitySelect.appendChild(option);
      });
    } catch (error) {
      activitiesList.innerHTML = "<p>Failed to load activities. Please try again later.</p>";esList.innerHTML = "<p>Failed to load activities. Please try again later.</p>";
      console.error("Error fetching activities:", error);
    }
  }

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;email").value;
    const activity = document.getElementById("activity").value;ity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,tivity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",     method: "POST",
        }   }
      );      );

      const result = await response.json(); await response.json();

      if (response.ok) {      if (response.ok) {


























});  fetchActivities();  // Initialize app  });    }      console.error("Error signing up:", error);      messageDiv.classList.remove("hidden");      messageDiv.className = "error";      messageDiv.textContent = "Failed to sign up. Please try again.";    } catch (error) {      }, 5000);        messageDiv.classList.add("hidden");      setTimeout(() => {      // Hide message after 5 seconds      messageDiv.classList.remove("hidden");      }        messageDiv.className = "error";        messageDiv.textContent = result.detail || "An error occurred";      } else {        signupForm.reset();        messageDiv.className = "success";        messageDiv.textContent = result.message;        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        signupForm.reset();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });

  // Initialize app
  fetchActivities();
});
