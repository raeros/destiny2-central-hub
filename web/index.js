
(function() {

  let localCacheCuratedStreamers;
  let curateStreamerList;

  function setGlobalCacheCuratedStreamers(){
        localCacheCuratedStreamers = checkLocalCacheForCuratedStreamers();
  }

  function setGlobalCurateStreamerList(){
        curateStreamerList = generateValidCurateStreamerQuery(localCacheCuratedStreamers);
  }

  setGlobalCacheCuratedStreamers();
  setGlobalCurateStreamerList();

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

  const getTwitchPlayerInformation = function (twitchSelectedType = "twitch-top-five", twitchDropDownSelected, twitchCuratedStreamerQuery){
    const twitchEndpoint = 
        twitchCuratedStreamerQuery && twitchCuratedStreamerQuery.length > 0 ? 
        `http://localhost:3000/api/${twitchSelectedType}${twitchCuratedStreamerQuery}` : 
        `http://localhost:3000/api/${twitchSelectedType}`;

    fetch(twitchEndpoint)
        .then(response => response.json())
        .then(data => {
            if(data && data.length > 0) {
                console.log("twitch information..");
                displayTwitchInformation(data, twitchDropDownSelected);
            }
        });
  };

  const getRedditDestinyInformation = function (contentType){
    fetch(`http://localhost:3000/api/reddit-posts?contentType=${contentType}`)
    .then(response => response.json())
    .then(data => {
        if(data && data.length > 0) {
            console.log("reddit information..");
            console.log(data);
            displayRedditDestinyInformation(data, false, contentType);
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
        let twitchCreateCuratedStreamerInputError = document.createElement("p");
        twitchCreateCuratedStreamerInputError.className = "twitch-create-curated-streamer-input-error";
        twitchCreateCuratedStreamerInputError.innerHTML = "";
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
        twitchCreateCuratedStreamerDiv.appendChild(twitchCreateCuratedStreamerInputError);
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
            twitchContentContainerDiv.innerHTML = "";
            let twitchContentContainerImg = document.createElement("img");
            let twitchContentContainerTitle = document.createElement("h3");
            let twitchContentContainerViews = document.createElement("p");
            let twitchContentContainerChannel = document.createElement("p");
            let twitchContentContainerChannelLink = document.createElement("a");
            let twitchDeleteCuratedStreamer = document.createElement("button");
            
            twitchDeleteCuratedStreamer.innerHTML = "Delete Streamer";
            twitchDeleteCuratedStreamer.className = "twitch-delete-curated-streamer-btn";
            twitchDeleteCuratedStreamer.style.visibility = selectedInfo == "topFive" ? "hidden" : "";
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
            twitchContentContainerDiv.appendChild(twitchDeleteCuratedStreamer);
            twitchContentContainer.appendChild(twitchContentContainerDiv);
            twitchDiv.appendChild(twitchContentContainer);

            twitchDeleteCuratedStreamer.addEventListener("click", (event) => deleteCuratedStreamer(event, element.userLogin));
        });

        if(localCacheCuratedStreamers.length >= 5){
            setCuratedStreamerMaxOut();
        } else {
            console.log("set current total..");
            setCuratedStreamerTotal(localCacheCuratedStreamers);
        }
         
         // set event listener for dropdown
         document.getElementsByClassName("twitch-dropdown-menu")[0].addEventListener("change", processDropDownChange);
         twitchCreateCuratedStreamer.addEventListener("click", processNewTwitchCuratedStreamer);

  };

  function displayRedditDestinyInformation(data, showStickiedPosts = false, selectedInfo){
        // edit the DOM.
        let redditDiv = document.getElementsByClassName("reddit-section")[0];
        let redditContentDiv = document.createElement("div");

        let redditDropDownMenu = document.createElement("select");
        redditDropDownMenu.className = "reddit-dropdown-menu";
        
        redditDropDownMenu.options.add( new Option("Hot", "hot", ""));
        redditDropDownMenu.options.add( new Option("Rising", "rising", ""));
        redditDropDownMenu.options.add( new Option("Top [all]", "top", ""));
        redditDropDownMenu.options.add( new Option("Top [hour]", "top&t=hour", ""));
        redditDropDownMenu.options.add( new Option("Top [day]", "top&t=day", ""));
        redditDropDownMenu.options.add( new Option("Top [week]", "top&t=week", ""));
        redditDropDownMenu.options.add( new Option("Top [month]", "top&t=month", ""));
        redditDropDownMenu.options.add( new Option("Top [year]", "top&t=year", ""));

        switch (selectedInfo) {
            case "hot":
                redditDropDownMenu.options.selectedIndex = 0;
                
                break;
            case "rising":
                redditDropDownMenu.options.selectedIndex = 1;
                break;
            case "top":
                redditDropDownMenu.options.selectedIndex = 2;
                break;
            case "top&t=hour":
                redditDropDownMenu.options.selectedIndex = 3;
                break;
            case "top&t=day":
                redditDropDownMenu.options.selectedIndex = 4;
                break;
            case "top&t=week":
                redditDropDownMenu.options.selectedIndex = 5;
                break;
            case "top&t=month":
                redditDropDownMenu.options.selectedIndex = 6;
                break;
            case "top&t=year":
                redditDropDownMenu.options.selectedIndex = 7;
                break;
            default:
                break;
        }
        localStorage.setItem("redditDefaultFilterSelected", selectedInfo);
        redditDropDownMenu.style.float = "left";
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

        redditContentDiv.appendChild(redditDropDownMenu);
        redditDiv.appendChild(redditContentDiv);

        document.getElementsByClassName("reddit-dropdown-menu")[0].addEventListener("change", (event) => processDropDownRedditChange(event, event.target.value));
       
  };

  function processDropDownChange(event){
        
        switch (this.value) {
            case "curated":                
                if(localCacheCuratedStreamers && localCacheCuratedStreamers.length > 0){       
                    //setGlobalCacheCuratedStreamers();       
                    console.log("curated streamers old: ", curateStreamerList);
                    setGlobalCurateStreamerList();
                    console.log("curated streamers new: ", curateStreamerList);
                    getTwitchPlayerInformation("twitch-curated", this.value, curateStreamerList);
                    break;
                } else {
                    console.log("no curated streamers");
                    let twitchContentContainer = document.getElementsByClassName("twitch-content-container")[0];
                    twitchContentContainer.innerHTML = "";
                    document.getElementsByClassName("twitch-create-curated-streamer")[0].style = "";
                    document.getElementsByClassName("twitch-create-curated-streamer-input")[0].style.visibility = "";
                    break;
                }
            case "topFive":
                getTwitchPlayerInformation("twitch-top-five", this.value);
                break;
            default:
                break;
        }
  }

  function processDropDownRedditChange(event, contentType){
    // call the service passing the config expected.
    getRedditDestinyInformation(contentType);
  }

  function setCuratedStreamerMaxOut() {
        console.log("maxOut called");
        document.getElementsByClassName("twitch-create-curated-streamer-input")[0].value = "";
        document.getElementsByClassName("twitch-create-curated-streamer-input-error")[0].visibility = "";
        document.getElementsByClassName("twitch-create-curated-streamer-input-error")[0].innerHTML = `5 of 5 streamers added. To add a new streamer, please remove one.`;
  }

  function setCuratedStreamerTotal(curateStreamerList) {
        document.getElementsByClassName("twitch-create-curated-streamer-input-error")[0].visibility = "";
        document.getElementsByClassName("twitch-create-curated-streamer-input-error")[0].innerHTML = `${curateStreamerList.length}/5 Streamer Added`;
  }

  function processNewTwitchCuratedStreamer(event) {
        if(localCacheCuratedStreamers.length >= 5){
            setCuratedStreamerMaxOut();
        } else {

            setCuratedStreamerTotal(localCacheCuratedStreamers);

            const newStreamerInputValue = document.getElementsByClassName("twitch-create-curated-streamer-input")[0].value;
            localCacheCuratedStreamers.push(newStreamerInputValue);

            const validCuratedStreamerQuery = generateValidCurateStreamerQuery(localCacheCuratedStreamers);
            console.log("new curated streamer added with value: ", validCuratedStreamerQuery);
    
            setLocalCacheForCuratedStreamers(localCacheCuratedStreamers);
            getTwitchPlayerInformation("twitch-curated", "curated", validCuratedStreamerQuery);
    
            return validCuratedStreamerQuery;
        }
  }

  function deleteCuratedStreamer(event, streamerName){     
        let tempLocalCacheCuratedStreamers  = localCacheCuratedStreamers;
        const streamerNameIndex = localCacheCuratedStreamers.indexOf(streamerName);
        tempLocalCacheCuratedStreamers.splice(streamerNameIndex, 1);
        setLocalCacheForCuratedStreamers(tempLocalCacheCuratedStreamers);
        event.target.parentNode.remove();
  }

  function generateValidCurateStreamerQuery(streamersNames){
        return `?` + streamersNames.map((streamer) => `login=${streamer}`).join('&');
  }

  function checkLocalCacheForCuratedStreamers(){
    const curatedStreamers = localStorage.getItem("curatedStreamers");
    if(curatedStreamers){
        let curatedStreamersValidQuery = JSON.parse(curatedStreamers);
        return curatedStreamersValidQuery;
    } else {
        return [];
    }
  }

  function setLocalCacheForCuratedStreamers(streamersNames){
        localStorage.setItem("curatedStreamers", JSON.stringify(streamersNames));
  }

  // twitch
  const twitchDefaultSelected = "topFive";
  const twitchDefaultSelectedStreams = "twitch-top-five";
  // reddit
  const redditDefaultFilterSelected = localStorage.getItem("redditDefaultFilterSelected") ? localStorage.getItem("redditDefaultFilterSelected") : "hot";

  getDestinyPlayerInformation();
  getTwitchPlayerInformation(twitchDefaultSelectedStreams, twitchDefaultSelected);
  getRedditDestinyInformation(redditDefaultFilterSelected);

})();
