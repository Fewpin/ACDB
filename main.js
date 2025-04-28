// main.js

function loadTable(mods) {
    const tableBody = document.getElementById('modTableBody');
    tableBody.innerHTML = "";
  
    mods.forEach(mod => {
      const tr = document.createElement('tr');
  
      const tagHTML = mod.tags.map(tag => `<span class="tag" onclick="filterByTag('${tag}')">${tag}</span>`).join(' ');
      const starHTML = "★".repeat(mod.rating) + "☆".repeat(5 - mod.rating);
  
      tr.innerHTML = `
        <td><img src="${mod.thumbnail}" alt="サムネイル" class="thumbnail"></td>
        <td>${mod.name}</td>
        <td>${mod.category}</td>
        <td>${mod.author}</td>
        <td><a href="${mod.download}" target="_blank" class="btn btn-primary btn-sm">ダウンロード</a></td>
        <td><span class="star">${starHTML}</span></td>
        <td>${mod.memo}</td>
        <td>${tagHTML}</td>
      `;
  
      tableBody.appendChild(tr);
    });
    window.modsData = mods;  // フィルター用に保存
  }
  
  function filterTable() {
    const searchInput = document.getElementById('searchBar').value.toLowerCase();
    const categoryInput = document.getElementById('categoryFilter').value;
    const rows = document.getElementById('modTableBody').getElementsByTagName('tr');
  
    Array.from(rows).forEach(row => {
      const name = row.cells[1].textContent.toLowerCase();
      const category = row.cells[2].textContent;
      const memo = row.cells[6].textContent.toLowerCase();
      const tags = row.cells[7].textContent.toLowerCase();
  
      const matchesSearch = 
        name.includes(searchInput) || 
        memo.includes(searchInput) ||
        tags.includes(searchInput);
      const matchesCategory = 
        categoryInput === "" || 
        category === categoryInput;
  
      row.style.display = (matchesSearch && matchesCategory) ? "" : "none";
    });
  }
  
  function filterByTag(tag) {
    document.getElementById('searchBar').value = tag;
    filterTable();
  }
  
  // ページ読み込み時にテーブル生成
  window.onload = function() {
    loadTable(mods);
  };
