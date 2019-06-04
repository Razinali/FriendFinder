// In this code below we create the Front-end JavaScript which "POSTS" our form data to our express server.
$(document).ready(function () {

    // event listener for modal
    document.querySelector(".close").addEventListener("click", function () {
        document.querySelector(".bg-modal").style.display = "none";
    });

    // Capture the form submit
    $("#survey").on("submit", function (event) {
        event.preventDefault();

        // Form validation to see If all required fields are answered, then capture user data
        var valid = true;

        if ($("#name").val() === "" || $("#photo").val === "") {
            valid = false;
        } else if ($("#q1").val() === "" || $("q2").val() === "" ||
            $("q3").val() === "" || $("q4").val() === "" ||
            $("q5").val() === "" || $("q6").val() === "" ||
            $("q7").val() === "" || $("q8").val() === "" ||
            $("q9").val() === "" || $("q10").val() === "") {
            valid = false;
        };

        // Here we grab the form elements
        if (valid === true) {
            var newUser = {
                name: $("#name").val().trim(),
                photo: $("#photo").val().trim(),
                scores: [
                    $("#q1").val(),
                    $("#q2").val(),
                    $("#q3").val(),
                    $("#q4").val(),
                    $("#q5").val(),
                    $("#q6").val(),
                    $("#q7").val(),
                    $("#q8").val(),
                    $("#q9").val(),
                    $("#q10").val()
                ]
            };
            console.log(newUser.name);
            // return newUser;

            // Use AJAX to post data to friends API
            $.post("/api/friends", newUser, function (data) {
                // take name and photo from post to display in modal
                $("#matchName").text(data.name);
                $("#matchPhoto").attr("src", data.photo);
                // Show modal with match information
                $("#modalMatch").modal("toggle");
                console.log(data);
            });
        } else {
            alert("Please enter missing information. All fields must be complete.")
        }
        return false;
    });

});