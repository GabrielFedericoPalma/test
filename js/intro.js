var intro={
    sectionCounter:0,
    init:function(){
        $("body")
        .append(
            $("<div>")
            .attr("id","intro")
            .append(
                $("<div>").addClass("wrapper")
                .append($("<h1>").text("Welcome"))
                .append($("<div>").addClass("loading"))
                )
            );
        $("header").css("top","-107px");
    },
    finish:function(){
        intro.sectionCounter++;
	setTimeout(function(){
            if(intro.sectionCounter>=7){
                $("#intro .wrapper").fadeOut(400,function(){
                    $("header").animate({
                        top:0
                    },400,function(){
                        $("#intro").fadeOut(400,function(){
                            $("#intro").remove();
							$(".btn-chat").show();
                        });
                    });
					
                });
                intro.sectionCounter=0;
            }
        },300);
    }
}
intro.init();