window.onload = function() {
    document.getElementById("searcher").focus();
  };

getGithub = () => {
    
    const inputUsername = getUsername()
    github_petition = new XMLHttpRequest()
    
    github_petition.open('GET', `https://api.github.com/users/${inputUsername}/repos`, true);
    github_petition.send()

    getDataGithub(github_petition)
    restart() 
   
}

restart = () => {
    const reposInfo = document.getElementById('reposInfo')
    const ul = document.getElementById('reposList')
    reposInfo.removeChild(ul);
    
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    userInfo.removeChild(userName);

    const userPic = document.getElementById('userPic')
    userInfo.removeChild(userPic)

    const repos = document.getElementById('repos')
    const repositories = document.getElementById('repositories')
    repos.removeChild(repositories);

    document.getElementById('repos').classList.remove("border-top")
}

getUsername = () => {
    return document.getElementById('searcher').value
}


getDataGithub = github_petition => {
    github_petition.onreadystatechange = function(){
        if(github_petition.readyState == 4 && github_petition.status == 200){
            if (github_petition.responseText.length !== 5) var data = github_petition.responseText;
            else var data = "User not found";
            setDataGithub(data)
        }else{
            const data = "User not found"
            setDataGithub(data)
        }
    }
}

setDataGithub = data => {


    if(data !== "User not found"){

        const aData = JSON.parse(data)        
        setUsername(aData)

        const h2 = document.createElement('h2')
        h2.setAttribute('id','repositories');
        h2.innerHTML = "Repositories:"

        const ul = document.createElement('ul')
        ul.setAttribute('id','reposList');

        const reposInfo = document.getElementById('reposInfo')

        document.getElementById('repos').insertBefore(h2, reposInfo);
        reposInfo.appendChild(ul);

        for (var i in aData){
            const li = document.createElement('li')
            li.setAttribute('id',`repoLi${i}`);

            const a = document.createElement('a')
            a.setAttribute('id',`repo${i}`);

            const p = document.createElement('p')
            p.setAttribute('id',`repoP${i}`);

            let repoName = aData[i].name
            let repoForks = aData[i].forks
            let repoUrl = aData[i].html_url
            let repoStars = aData[i].stargazers_count

            document.getElementById('reposList').appendChild(li);
            document.getElementById(`repoLi${i}`).appendChild(a);
            document.getElementById(`repoLi${i}`).appendChild(p);

            document.getElementById(`repo${i}`).innerHTML = `${repoName}`
            document.getElementById(`repoP${i}`).innerHTML = `Forks: ${repoForks} Stars: ${repoStars}`
            document.getElementById(`repo${i}`).href = repoUrl

            document.getElementById(`repoLi${i}`).classList.add("border-bottom")
            
        }
    }else {
        setUsername(data)
    }
    
}

insertHTML = () => {

    const userPic = document.createElement('img')
    userPic.setAttribute('id','userPic');
    userPic.setAttribute('class','userPic');

    const userName = document.createElement('h1')
    userName.setAttribute('id','userName');

    document.getElementById('userInfo').appendChild(userPic);
    document.getElementById('userInfo').appendChild(userName);
}

setUsername = (data) => {
    
    insertHTML()

    if (data !== "User not found"){

        document.getElementById('repos').classList.add("border-top")
        document.getElementById('userPic').src = data[0].owner.avatar_url
        document.getElementById('userName').innerHTML = data[0].owner.login

    }else {

        const src = document.getElementById("userPic").getAttribute("src")
        const url = 'https://i.gyazo.com/c6cac312424552cdd4f2e4ccd9b816e7.png'

        if(src !== url){
            document.getElementById('userPic').src = url
        }
    }

}
