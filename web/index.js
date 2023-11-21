
(function() {

  const getDestinyPlayerInformation = function (){
    fetch("http://localhost:3000/api/destiny-profile")
        .then(response => response.json())
        .then(data => {
            if(data.characters && data.characters.length > 0) {
                console.log("destiny 2 information..");
                displayPlayerInformation(data.characters);
            }
        });
  };

  const getTwitchPlayerInformation = function (twitchSelectedType = "twitch-top-five", twitchDropDownSelected){
    fetch(`http://localhost:3000/api/${twitchSelectedType}`)
        .then(response => response.json())
        .then(data => {
            if(data && data.length > 0) {
                console.log("twitch information..");
                console.log(data);
                displayTwitchInformation(data, twitchDropDownSelected);
            }
        });
  };

  const getRedditDestinyInformation = function (contentType = "hot"){
    fetch(`http://localhost:3000/api/reddit-posts?contentType=${contentType}`)
    .then(response => response.json())
    .then(data => {
        if(data && data.length > 0) {
            console.log("reddit information..");
            console.log(data);
            displayRedditDestinyInformation(data);
        }
    });
  };

  function displayPlayerInformation(data){
        // destiny 2 section
        let destinyClassesDiv = document.getElementsByClassName("classes")[0];
        let destinyLoadoutClassDiv = document.getElementsByClassName("loadout")[0];
        
        destinyClassesDiv.innerHTML = "";
        destinyLoadoutClassDiv.innerHTML = "";

        data.forEach(element => {

            const createEmblemSection = function(){
                let destinyBgDiv = document.createElement("div");
                
                destinyBgDiv.className = "player-characters-emblem-bg";
                destinyBgDiv.style.background = `url(${element.characterBackgroundPath})`;
                              
                // text
                destinyTextDiv = document.createElement("div");
                destinyTextDiv.className = "player-characters-emblem";
                destinyTextDiv.innerHTML = `<h3>${element.characterClassName}</h3>`;
                
                // append
                destinyBgDiv.appendChild(destinyTextDiv);
                destinyClassesDiv.appendChild(destinyBgDiv);
               
            };

            // temp logic for loadout
            const createLoadoutSection = function(){
                element.equipmentsActive.forEach(equipment => {
                    let destinyLoadoutDiv = document.createElement("div");
                    let destinyLoadoutImg = document.createElement("img");

                    destinyLoadoutDiv.className = "player-characters-loadout";
                    destinyLoadoutImg.src = equipment.imagePath;
                    destinyLoadoutImg.alt = equipment.name;
                    destinyLoadoutDiv.appendChild(destinyLoadoutImg);
                    destinyLoadoutClassDiv.appendChild(destinyLoadoutDiv);
                });

            };
            
            createEmblemSection();
            // temp logic for loadout
            if(element.characterClassName == "Titan"){
                createLoadoutSection();
            };

        });


  };

  function displayTwitchInformation(data, selectedInfo){
        // twitch section
        let twitchDiv = document.getElementsByClassName("twitch-section")[0];
        twitchDiv.innerHTML = "";

        let twitchContentContainer = document.createElement("div");
        twitchContentContainer.className = "twitch-content-container";
        
        let twitchDropDownDiv = document.createElement("div");
        let twitchDropDownMenu = document.createElement("select");
        let twitchCreateCuratedStreamerDiv = document.createElement("div");
        let twitchCreateCuratedStreamer = document.createElement("button");
        let twitchCreateCuratedStreamerInput = document.createElement("input");
        twitchCreateCuratedStreamerInput.className = "twitch-create-curated-streamer-input";
        twitchCreateCuratedStreamerInput.placeholder = "Streamer Name";
        

        twitchDropDownDiv.className = "twitch-dropdown";
        twitchDropDownMenu.className = "twitch-dropdown-menu";
        twitchCreateCuratedStreamerDiv.className = "twitch-create-curated-streamer";
        twitchCreateCuratedStreamer.className = "twitch-create-curated-streamer-btn";

        twitchCreateCuratedStreamer.innerHTML = "Add Streamer";
        twitchDropDownMenu.options.add( new Option("Top Five", "topFive", ""));
        twitchDropDownMenu.options.add( new Option("Curated", "curated", ""));
        twitchDropDownMenu.options.selectedIndex = selectedInfo == "topFive" ? 0 : 1; // set the selected index based on the selectedInfo
        twitchDropDownMenu.style.float = "left";

        twitchDropDownDiv.appendChild(twitchDropDownMenu);
        twitchCreateCuratedStreamerDiv.appendChild(twitchCreateCuratedStreamer);
        twitchCreateCuratedStreamerDiv.appendChild(twitchCreateCuratedStreamerInput);
        twitchDropDownDiv.appendChild(twitchCreateCuratedStreamerDiv);
        twitchDiv.appendChild(twitchDropDownDiv);

        if(selectedInfo == "topFive"){
            document.getElementsByClassName("twitch-create-curated-streamer")[0].style.visibility = "hidden";
            document.getElementsByClassName("twitch-create-curated-streamer-input")[0].style.visibility = "hidden";
        } else {
            document.getElementsByClassName("twitch-create-curated-streamer")[0].style = "";
            document.getElementsByClassName("twitch-create-curated-streamer-input")[0].style.visibility = "";
        }

        data.forEach(element => {
            let twitchContentContainerDiv = document.createElement("div");
            let twitchContentContainerImg = document.createElement("img");
            let twitchContentContainerTitle = document.createElement("h3");
            let twitchContentContainerViews = document.createElement("p");
            let twitchContentContainerChannel = document.createElement("p");
            let twitchContentContainerChannelLink = document.createElement("a");

            twitchContentContainerDiv.className = "twitch-content";
            twitchContentContainerImg.src = element.thumbnailUrl;
            twitchContentContainerImg.alt = element.title;
            twitchContentContainerTitle.innerHTML = element.title;
            twitchContentContainerViews.innerHTML = element.viewerCount + " viewers";
            if(element.type == "offline"){
                twitchContentContainerViews.innerHTML = "offline";
            }
            
            twitchContentContainerChannel.innerHTML = element.userName;
            twitchContentContainerChannelLink.href = `https://www.twitch.tv/${element.userLogin}`;

            twitchContentContainerDiv.appendChild(twitchContentContainerImg);
            twitchContentContainerDiv.appendChild(twitchContentContainerTitle);
            twitchContentContainerDiv.appendChild(twitchContentContainerViews);
            twitchContentContainerChannelLink.appendChild(twitchContentContainerChannel);
            twitchContentContainerDiv.appendChild(twitchContentContainerChannelLink);
            twitchContentContainer.appendChild(twitchContentContainerDiv);
            twitchDiv.appendChild(twitchContentContainer);
        });

         // set event listener for dropdown
         document.getElementsByClassName("twitch-dropdown-menu")[0].addEventListener("change", processDropDownChange);

  };

  function displayRedditDestinyInformation(data, showStickiedPosts = false){
        // edit the DOM.
        let redditDiv = document.getElementsByClassName("reddit-section")[0];
        let redditContentDiv = document.createElement("div");
        redditContentDiv.className = "reddit-content";

        redditDiv.innerHTML = "";
        redditContentDiv.innerHTML = "";

        data.forEach(element => {
            if(showStickiedPosts == element.stickied) {
                let redditContentPost = document.createElement("div");
                redditContentPost.className = "reddit-content-post";

                let redditContentPostLink = document.createElement("a");
                redditContentPostLink.href = element.url;

                let redditContentPostTitleDiv = document.createElement("div");
                redditContentPostTitleDiv.className = "reddit-content-post-title";

                let redditContentPostAuthorDiv = document.createElement("div");
                redditContentPostAuthorDiv.className = "reddit-content-post-author";
    
                let redditContentPostTitle = document.createElement("h3");
                redditContentPostTitle.innerHTML = `<b>${element.title}</b>`;
    
                let redditContentPostAuthor = document.createElement("p");
                redditContentPostAuthor.innerHTML = element.author;
    

                redditContentPostTitleDiv.appendChild(redditContentPostTitle);
                redditContentPost.appendChild(redditContentPostTitleDiv);
                redditContentPostAuthorDiv.appendChild(redditContentPostAuthor);
                redditContentPost.appendChild(redditContentPostAuthorDiv);


                redditContentPostLink.appendChild(redditContentPost);
                redditContentDiv.appendChild(redditContentPostLink);
                
            }
        });

        redditDiv.appendChild(redditContentDiv);

       
  };

  function processDropDownChange(event){
        switch (this.value) {
            case "curated":
                getTwitchPlayerInformation("twitch-curated?login=datto&login=leopard&login=gladd", this.value);
                break;
            case "topFive":
                getTwitchPlayerInformation("twitch-top-five", this.value);
                break;
            default:
                break;
        }
  }

  // twitch
  const twitchDefaultSelected = "topFive";
  const twitchDefaultSelectedStreams = "twitch-top-five";
  // reddit
  const redditDefaultFilterSelected = "hot";

  //getDestinyPlayerInformation();
  getTwitchPlayerInformation(twitchDefaultSelectedStreams, twitchDefaultSelected);
  //getRedditDestinyInformation(redditDefaultFilterSelected);

})();
