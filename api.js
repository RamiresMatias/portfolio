const apiGithub = 'https://api.github.com'

// READ-ONLY TOKEN
const headers = {
  'Authorization': `Bearer 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`
}

const projectsEl = document.querySelector('.projects')

const getRepositories = async () => {
  try {
    const repositories = await fetch(`${apiGithub}/users/RamiresMatias/repos`, {headers}).then(res => res.json())
    repositories.forEach(repo => createElementsProject(repo))
  } catch (error) {
    throw error
  }
}

const getLanguagesRepository = async (repositoryName) => {
  try {
    return await fetch(`${apiGithub}/repos/RamiresMatias/${repositoryName}/languages`, {headers})
      .then(async res => {
        const languages = await res.json()
        return Object.keys(languages)
      })
  } catch (error) {
    throw error
  }
}

const createElementsProject = async (repo) => {
  if(!repo.id) return

  const languages = await getLanguagesRepository(repo.name)

  const anchorEl = document.createElement('a')
  const titleEl = document.createElement('div')
  const descEl = document.createElement('div')
  const tagsEl = document.createElement('div')
  const imgEl = document.createElement('div')

  anchorEl.classList.add('projects__item')
  titleEl.classList.add('projects__item--title')
  descEl.classList.add('projects__item--description')
  tagsEl.classList.add('projects__item--tags')
  imgEl.classList.add('projects__item--image')

  titleEl.textContent = repo.name
  descEl.textContent = repo.description || 'Sem descrição'
  descEl.title = repo.description
  anchorEl.href = repo.html_url
  anchorEl.target = '_blank'

  languages.forEach(lg => {
    const tagEl = document.createElement('div')
    tagEl.classList.add('tag')
    tagEl.textContent = lg
    tagsEl.appendChild(tagEl)
  })

  anchorEl.appendChild(titleEl)
  anchorEl.appendChild(descEl)
  anchorEl.appendChild(tagsEl)
  anchorEl.appendChild(imgEl)

  projectsEl.appendChild(anchorEl)
}

(async function(){
  await getRepositories()
})()