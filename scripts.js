// Fetch user data from the server and populate the table
function fetchUsers() {
    fetch('/users')
      .then((response) => response.json())
      .then((data) => {
        const userList = document.getElementById('user-list');
  
        // Clear existing table rows
        userList.innerHTML = '';
  
        // Populate the table with user data
        data.forEach((user) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
            <td>${user.phone}</td>
            <td>${user.password}</td>
            <td>${user.status}</td>
            <td>${user.date}</td>
            <td>${user.profile_pic}</td>
          `;
          userList.appendChild(row);
        });
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }
  
  // Trigger the fetchUsers function to populate the table
  fetchUsers();
  
  // Download user data as CSV
  const downloadBtn = document.getElementById('download-btn');
  downloadBtn.addEventListener('click', () => {
    window.location.href = '/download';
  });
  
  // Search functionality
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.trim().toLowerCase();
    const rows = document.querySelectorAll('#user-list tr');
  
    rows.forEach((row) => {
      const name = row.cells[1].textContent.toLowerCase();
      if (name.includes(searchValue)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
  