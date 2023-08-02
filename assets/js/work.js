// JavaScript for the work page

// Loop through all the modals
$(".modal").each(function() {
    let modal_ = this

    // Listen for when the expand paragraph button is pressed
    $(this).find(".expand-btn").click(function() {
        // Expand the paragraph
        $(modal_).find(`p.${$(this).attr("data-p")}`).removeClass("compress-p")
        $(this).attr("data-expanded", true)
        $(this).addClass("d-none")
    })
})