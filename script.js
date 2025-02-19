document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.querySelectorAll("nav button");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            let sectionId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            showSection(sectionId);
        });
    });
});

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    // Show the selected section
    let section = document.getElementById(sectionId);
    if (section) {
        section.classList.add("active");
    }
}

// Function to Add Items to Bill
function addItem() {
    let table = document.getElementById("billBody");
    let row = table.insertRow();

    let itemCell = row.insertCell(0);
    let priceCell = row.insertCell(1);
    let qtyCell = row.insertCell(2);
    let totalCell = row.insertCell(3);
    let actionCell = row.insertCell(4);

    itemCell.innerHTML = `<input type="text" placeholder="Item Name">`;
    priceCell.innerHTML = `<input type="number" placeholder="Price" oninput="updateTotal(this)">`;
    qtyCell.innerHTML = `<input type="number" placeholder="Qty" value="1" oninput="updateTotal(this)">`;
    totalCell.innerHTML = "0";
    actionCell.innerHTML = `<button onclick="removeItem(this)">Remove</button>`;
}

// Update Total Price in Bill
function updateTotal(element) {
    let row = element.parentElement.parentElement;
    let price = row.cells[1].querySelector("input").value || 0;
    let quantity = row.cells[2].querySelector("input").value || 1;
    row.cells[3].innerText = (price * quantity).toFixed(2);
}

// Remove Item from Bill
function removeItem(button) {
    let row = button.parentElement.parentElement;
    row.remove();
}

// Print Bill Function (Only Shows Selected Items)
function printBill() {
    let billContent = "<h2 style='text-align:center;'>BUDDIES CAFE since 2025- Bill Receipt</h2>";
    billContent += "<table border='1' style='width:100%; text-align:center;'><tr><th>Item</th><th>Price</th><th>Quantity</th><th>Total</th></tr>";
    
    let rows = document.getElementById("billBody").rows;

    for (let i = 0; i < rows.length; i++) {
        let item = rows[i].cells[0].querySelector("input").value;
        let price = rows[i].cells[1].querySelector("input").value;
        let qty = rows[i].cells[2].querySelector("input").value;
        let total = rows[i].cells[3].innerText;

        billContent += `<tr><td>${item}</td><td>${price}</td><td>${qty}</td><td>${total}</td></tr>`;
    }

    billContent += "</table>";

    let printWindow = window.open("", "", "width=600,height=400");
    printWindow.document.write(billContent);
    printWindow.document.close();
    printWindow.print();
}

// Download Monthly Report as Text File
function downloadReport() {
    let reportContent = "Total Monthly Items Received: 500\nTotal Monthly Expenditure: ₹10,000\nMonthly Income: ₹15,000";
    let blob = new Blob([reportContent], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "monthly_report.txt";
    link.click();
}
