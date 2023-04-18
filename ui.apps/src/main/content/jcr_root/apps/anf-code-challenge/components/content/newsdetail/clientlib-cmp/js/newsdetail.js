
    $(document).ready(function(){
        getNewsFeed();
    });

    function getNewsFeed(){
        $.ajax({     
            type : "GET",     
            url : '/bin/newsfeed',
            success : function(data, textStatus, jqXHR) {
                showNews(data);
            },     
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
            } 
        });
    }

    function showNews(data) {
        var date = getTodayDate();
        $.each(data, function(index,ele) {
            var card = addElements(ele.urlImage, ele.title, ele.author, date, ele.description);
            $(".container .columns").append(card);
        }); 
    }

    function addElements(img, title, author, date, description){

        var column = "<div class=\"column\">";
        var img = "<img src="+img+"/>";
        var title = "<div class=\"title\"><h2>"+title+"</h2></div>";
        var authordate = "<div class=\"author-date\"> <span>"+author+" | "+date+"</span></div>";
        var description = "<div class=\"description\"> <p>"+description+"</p> </div>";
        var columnend = "</div>";
        var card = column.concat(img).concat(title).concat(authordate).concat(description).concat(columnend);
        
        return $(card);

    }

    function getTodayDate() {

        var d = new Date();
        var month = d.getMonth()+1;
        var day = d.getDate();

        var todayDate = ((''+day).length<2 ? '0' : '') + day + '.' +
            			((''+month).length<2 ? '0' : '') + month + '.' +
            			(d.getFullYear());
        
        return todayDate;
        
    }


