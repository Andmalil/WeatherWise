var hint_count = 0
var current_data = null
var debug = false


// Changes height of search hints field
function change_hint_height() {
    // Stops previous animations
    $(".search-hints").stop()
    $(".hint-line").stop()

    // Makes hints visible when focus the search
    $(".search-hints").css("visibility", "visible")

    // Animation of deployment of the hints field
    $(".search-hints").animate({height: `${$(".hint-content-items").height() < 300 ? $(".hint-content-items").height()+10 : 300}px`}, 400)
       
    // Animation of the dividing line
    $(".hint-line").animate({width: "230px"}, 400)
}

// Removes search hints field
function remove_hint() {
    if (!debug) {
        // Stops previous animations
        $(".search-hints").stop()
        $(".hint-line").stop()

        // Animation of hiding of the search hints field
        $(".search-hints").animate({height: "0"}, 400, () => {
            // Hides the search hints field when animation is over
            $(".search-hints").css("visibility", "hidden")
            $(".search-panel").removeClass("focused-search")
        })
        // Animation of hiding the dividing line
        $(".hint-line").animate({width: "0"}, 400)
    }
}

function select_hint(id, name) {
    $(".search").val(name)
    search(name)
    search_result(id)
    $(".search").blur()
}

function load_hints(data) {
    if (data != null) {  
        var result = '<ul class="hint-content-items">'
        for (var i = 0; i < data.length; i++) {

            result += `
            <li  id="${data[i]["id"]}" class="hint-content-item">
                <button onclick="select_hint('${data[i]["ID"]}', '${data[i]["NameASCII"]}')">
                    ${data[i]["NameASCII"]} (${data[i]["Country"]})
                </button>
            </li>`
        }
        result += "</ul>"
        $(".hint-content").html(result)
        if ($(".search").is(":focus")) {
            change_hint_height()
        } 
    } else {
        $(".hint-content").html("")
        remove_hint()
    }
}
// Sends GET request to the server for getting a list of hints based on user input
function search(word) {
    return $.ajax({
        type: "GET",
        url: `/citysearch/${word}`,
        dataType: "json",
        success: (data) => {
            hint_count = data != null ? data.length : 0
            load_hints(data)
        },
        error: (jqXHR, exception) => {
            hint_count = 0
            if (jqXHR.status === 0) {
                console.log('Not connect. Verify Network.');
            } else if (jqXHR.status == 404) {
                console.log('Requested page not found (404).');
            } else if (jqXHR.status == 500) {
                console.log('Internal Server Error (500).');
            } else if (exception === 'parsererror') {
                console.log('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                console.log('Time out error.');
            } else if (exception === 'abort') {
                console.log('Ajax request aborted.');
            } else {
                console.log('Uncaught Error. ' + jqXHR.responseText);
            }
            return ""
        }

    })
}

function search_result(id) {
    return $.ajax({
        type: "GET",
        url: `/search/${id}`,
        dataType: "json",
        success: (data) => {
            current_data = data
            console.log(current_data["current"])
        },
        error: (jqXHR, exception) => {
            if (jqXHR.status === 0) {
                console.log('Not connect. Verify Network.');
            } else if (jqXHR.status == 404) {
                console.log('Requested page not found (404).');
            } else if (jqXHR.status == 500) {
                console.log('Internal Server Error (500).');
            } else if (exception === 'parsererror') {
                console.log('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                console.log('Time out error.');
            } else if (exception === 'abort') {
                console.log('Ajax request aborted.');
            } else {
                console.log('Uncaught Error. ' + jqXHR.responseText);
            }
            return ""
        }
    })
}
