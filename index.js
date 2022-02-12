run();

async function run() {
  const heroes = await getHeroes();

  //const fiveFirstHeroes = heroes.slice(0, 5);

  let allHeroesPublishiers = [];
  let marvelHeroes = [];
  
  heroes.forEach((hero) => {
    allHeroesPublishiers.push(hero.biography.publisher);
    const htmlHeroTemplate = creatHeroTemplate(hero);
    
    appendHeroHTML(htmlHeroTemplate);
  });
  console.log('Tamanho: ', allHeroesPublishiers.length);

  const marvelButtonElement = document.getElementById('marvel');
  const dcButtonElement = document.getElementById('dc');
  const othersButtonElement = document.getElementById('outros');
  
  marvelButtonElement.addEventListener('click', () => {
    removeHeroHTML();
    heroes.forEach((hero) => {
      if (hero.biography.publisher === 'Marvel Comics'){
        marvelHeroes.push(hero);
        //debugger;
        const htmlHeroTemplate = creatHeroTemplate(hero);
        appendHeroHTML(htmlHeroTemplate);
        console.log('herois: ', marvelHeroes);
      }
    });
  });

  dcButtonElement.addEventListener('click', () => {
    removeHeroHTML();
    heroes.forEach((hero) => {
      if (hero.biography.publisher === 'DC Comics'){
        marvelHeroes.push(hero);
        //debugger;
        const htmlHeroTemplate = creatHeroTemplate(hero);
        appendHeroHTML(htmlHeroTemplate);
        console.log('herois: ', marvelHeroes);
      }
    });
  });

  othersButtonElement.addEventListener('click', () => {
    removeHeroHTML();
    heroes.forEach((hero) => {
      if (hero.biography.publisher !== 'Marvel Comics' && hero.biography.publisher !== 'DC Comics'){
        marvelHeroes.push(hero);
        //debugger;
        const htmlHeroTemplate = creatHeroTemplate(hero);
        appendHeroHTML(htmlHeroTemplate);
        console.log('herois: ', marvelHeroes);
      }
    });
  });  
}



async function getHeroes() {
  try {
    const requestResult = await fetch(
      "https://akabab.github.io/superhero-api/api/all.json"
    );
    const jsonresult = await requestResult.json();

    //console.log(jsonresult);
    return jsonresult;
  } catch (error) {
    console.error("algum erro ocorreu");
  }
}

function creatHeroTemplate(hero) {
  const htmlTemplate = ` 
        <div class="card">
            <h3>${hero.name}</h3>

            <div class="hero">
                <img src=${hero.images.sm}>

                <div class="hero-power-stats">
                    <div class="atributes">
                        <h4>INTELLIGENCE</h4>
                        <div>${hero.powerstats.intelligence}</div>
                    </div>

                    <div class="atributes">
                        <h4>STRENGH</h4>
                        <div>${hero.powerstats.strength}</div>
                    </div>

                    <div class="atributes">
                        <h4>SPEED</h4>
                        <div>${hero.powerstats.speed}</div>
                    </div>

                    <div class="atributes">
                        <h4>PUBLISHIER</h4>
                        <div>${hero.biography.publisher}</div>
                    </div>

                </div>
                <div class="hero-power-stats-2"> 
                    <div class="atributes">
                        <h4>DURABILITY</h4>
                        <div>${hero.powerstats.durability}</div>
                    </div>

                    <div class="atributes">
                        <h4>POWER</h4>
                        <div>${hero.powerstats.power}</div>
                    </div>

                    <div class="atributes">
                        <h4>COMBAT</h4>
                        <div>${hero.powerstats.combat}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
  return htmlTemplate;
}

function appendHeroHTML(heroHTML) {
  const heroesContainerElement = document.getElementById("cardsContainer");
  heroesContainerElement.insertAdjacentHTML("beforeend", heroHTML);
}

function removeHeroHTML() {

  const heroesCards = document.getElementById("cardsContainer");
  heroesCards.remove();
  const cardContainer = document.createElement('div');
  cardContainer.setAttribute('class', 'cardsContainer');
  cardContainer.setAttribute('id', 'cardsContainer');
  const heroesContainerElement = document.getElementById("heroesContainer");
  heroesContainerElement.appendChild(cardContainer);
}


