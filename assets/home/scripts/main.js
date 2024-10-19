$(document).ready(() => {
    var search_request = null
    $(".search-cross").hide()

    $(".magnifier-button").click(() => {
        if ($(".hint-content-items li").length != 0) {
            search_result($(".hint-content-item:first-child").attr("id"))
        }
    })

    $(".search-cross").click(() => {
        $(".search").val("")
        $(".search-cross").hide()
        $($(".hint-content").html(""))

        hint_count = 0
    })

    $(".search").keyup((e) => {
        if (e.keyCode == 13) {
            if ($(".hint-content-items li").length != 0) {
                search_result($(".hint-content-item:first-child").attr("id"))
            }
            $(".search").blur()
        }
    })

    $(".search").on("input", () => {
        // Changes color of the search when focus the search
        $(".search-panel").addClass("focused-search")
        
        if ($(".search").val().length > 0 && $(".search-cross").is(":hidden")) {
            $(".search-cross").show()
        } else if ($(".search").val().length == 0 && $(".search-cross").is(":visible")) {
            $(".search-cross").hide()
        }
        if ($(".search").val().length > 0) {
            if (search_request != null) {
                search_request.abort()
            }
            search_request = search($(".search").val())
        } else {
            remove_hint()
            hint_count = 0
            $(".hint-content").html("")
        }
        
        

    })


    $(".search-cross").mouseover(() => {
        // Changes the clear button icon 
        $(".search-cross .light-cross").css({"visibility": "hidden"})
        $(".search-cross .dark-cross").css({"visibility": "visible"})
    })

    $(".search-cross").mouseout(() => {
        // Changes the clear button icon 
        $(".search-cross .light-cross").css({"visibility": "visible"})
        $(".search-cross .dark-cross").css({"visibility": "hidden"})
    })

    $(".search").focusin(() => {
        // Changes color of the search when focus the search
        $(".search-panel").addClass("focused-search")

        if (hint_count > 0) {
            change_hint_height()
        }
    })

    $(".search").focusout(() => {
        remove_hint()
    })
})
