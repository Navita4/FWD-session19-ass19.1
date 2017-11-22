(var Page=(function(){
    // Declare the view model used within the page
    function ViewModel(){
        var self=this;
        self.arrivals=KO.observableArray([]);

    }
    // expose the view model through the page module
    return{
        Vm:new ViewModel(),
        hideOfflineWarning:function(){
            // Enable the live data
            document.querySelector(".arrivals-list").classList.remove('loading')
            // remove the offline message 
            document.getElementById('offline').remove();
            // load the live data
        },
        showofflineWarning:function(){
            // Disable the live data
            document.querySelector(".arrivals-list").classList.add('loading')
            // load html template informing the user offline
            var request=new XMLHttpRequest();
            request.open('GET','./offline.html',true);
            request.onload=function(){
                if(request.status===200){
                    // Success
                    // create offline element with html loaded from offline.html template
                    var offlineMessageElement=document.createElement("div");
                    offlineMessageElement.setAttribute("id","offline");
                    offlineMessageElement.innerHTML=request.responseText;
                    document.getElementById("main").appendChild(offlineMessageElement);
                }
                else{
                    // error retrieving file
                    console.warn("Error retrieving offline.html");
                }
            };
            request.onerror=function(){
                // network errors
                console.error('connection error');
            };
            request.send();
        }
    }
})();