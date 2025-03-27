 // ✅ Initialize EmailJS with your Public Key (User ID)
(function(){
    emailjs.init("0GaJDoUVBJAeUEkS9");  // 🔹 Replace with your actual User ID from EmailJS
})();

function bookNow(destination) {
    let fees = {
        "Paris": "$1000",
        "Tokyo": "$1200"
    };


    let confirmBooking = confirm(`The trip to ${destination} costs ${fees[destination]}. Do you want to proceed?`);
    if (!confirmBooking) {
        alert("Booking cancelled.");
        return;
    }

    
    let bookingMode = prompt("Do you want to book Online or Offline? (Type 'Online' or 'Offline')").toLowerCase();
    if (bookingMode !== "online" && bookingMode !== "offline") {
        alert("Invalid choice. Booking cancelled.");
        return;
    }

    
    let paymentMethod = prompt("Choose Payment Method: Online Payment, Cash, or Offline Payment").toLowerCase();
    if (!["online payment", "cash", "offline payment"].includes(paymentMethod)) {
        alert("Invalid payment method. Booking cancelled.");
        return;
    }

    
    let name = prompt("Enter your name:");
    if (!name) {
        alert("Booking cancelled. Name is required.");
        return;
    }

    let email = "";
    let contact = prompt("Enter your contact number:");
    if (!contact) {
        alert("Booking cancelled. Contact number is required.");
        return;
    }

    
    if (bookingMode === "online") {
        email = prompt("Enter your email:");
        if (!email) {
            alert("Booking cancelled. Email is required for online booking.");
            return;
        }
    }

    
    let message = `<strong>Thank you, ${name}!</strong><br>
                   Your trip to <strong>${destination}</strong> is booked successfully.<br>
                   <strong>Booking Mode:</strong> ${bookingMode.toUpperCase()}<br>
                   <strong>Payment Method:</strong> ${paymentMethod.toUpperCase()}<br>
                   <strong>Contact:</strong> ${contact}<br>
                   <strong>Booking Fees:</strong> ${fees[destination]}`;

    if (bookingMode === "online") {
        message += `<br><strong>Email Sent To:</strong> ${email}`;
    }

    document.getElementById("confirmation").innerHTML = message;

    
    let bookingList = document.getElementById("bookingList");
    let listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${name}</strong> booked a trip to <strong>${destination}</strong> (${bookingMode.toUpperCase()}) - Payment: ${paymentMethod.toUpperCase()}`;
    bookingList.appendChild(listItem);

    if (bookingMode === "online") {
        emailjs.send("service_7s8owrd", "template_a7cipco", {
            to_email: email,
            user_name: name,
            destination: destination,
            fees: fees[destination],
            payment_method: paymentMethod
        }).then(function(response) {
            console.log("Email sent successfully!", response);
            alert("📧 Booking confirmation email sent successfully!");
        }, function(error) {
            console.log("Failed to send email", error);
            alert("⚠️ Failed to send confirmation email.");
        });
    } else {
        alert("✅ Offline booking confirmed. Please visit our office to complete your booking.");
    }
}
