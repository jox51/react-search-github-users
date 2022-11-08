import React, { useState, useEffect, useContext } from "react"
import mockUser from "./mockData.js/mockUser"
import mockRepos from "./mockData.js/mockRepos"
import mockFollowers from "./mockData.js/mockFollowers"
import axios from "axios"

const rootUrl = "https://api.github.com/search/users?q="

const GithubContext = React.createContext()

const GithubProvider = ({ children }) => {
  const [value, setValue] = useState("")
  const [term, setTerm] = useState("")
  const [user, setUser] = useState(mockUser)
  const [loading, setLoading] = useState(true)
  const [followers, setFollowers] = useState(mockFollowers)
  const [repos, setRepos] = useState(mockRepos)
  const [apiLimit, setApiLimit] = useState({ limit: 0, remain: 0 })
  const [error, setError] = useState({ show: false, msg: "" })

  useEffect(() => {
    fetchRepos()
  }, [term])

  useEffect(() => {
    repos && setLoading(false)
  }, [repos])
  useEffect(() => {
    checkRequests()
  }, [])

  const checkRequests = () => {
    axios(`https://api.github.com/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining }
        } = data
        setApiLimit({ ...apiLimit, remain: remaining })
        if (remaining === 0) {
          toggleError(true, "sorry, you have exceeded your hourly rate limit!")
        }
      })
      .catch((err) => console.log(err))
  }

  function toggleError(show = false, msg = "") {
    setError({ show, msg })
  }
  const changeHandler = (e) => {
    setValue(e.target.value)
  }

  const clickHandler = (e) => {
    e.preventDefault()
    setTerm(value)
  }

  let lanArray = []
  repos.map((item, index) => {
    const { language } = item
    return lanArray.push(language)
  })

  const convertLanData = () => {
    let counts = {}
    let numArr = []
    let typeArr = []
    for (let i = 0; i < lanArray.length; i++) {
      if (lanArray[i] !== null) {
        if (lanArray[i] in counts) {
          counts[lanArray[i]]++
        } else counts[lanArray[i]] = 1
      }
    }
    for (const key in counts) {
      typeArr.push(key)
      numArr.push(counts[key])
    }

    let dataMap = typeArr.map((item, index) => {
      return { label: typeArr[index], value: numArr[index] }
    })
    let jsonData = JSON.stringify(dataMap)
    let jsonObj = JSON.parse(jsonData)

    return jsonObj
  }
  const jsonObj = convertLanData()

  const convertStarData = () => {
    let starProj = []
    let starNum = []
    repos.map((repo, index) => {
      const { name, stargazers_count } = repo
      starProj.push(name)
      starNum.push(stargazers_count)
    })

    let reposMap = starProj.map((item, index) => {
      return { label: starProj[index], value: starNum[index] }
    })
    let reposMod = reposMap.sort((a, b) => b.value - a.value).slice(0, 5)
    let jsonReposData = JSON.stringify(reposMod)
    let jsonReposObj = JSON.parse(jsonReposData)

    return jsonReposObj
  }
  const jsonReposData = convertStarData()

  const convertLangStarData = () => {
    let langTemp = []
    let starsTemp = []
    repos.map((repo, index) => {
      const { language, stargazers_count } = repo
      if (language !== null) {
        langTemp.push(language)
        starsTemp.push(stargazers_count)
      }
    })

    let langStarsMap = langTemp.map((item, index) => {
      return { label: langTemp[index], value: starsTemp[index] }
    })

    const sumByKey = () => {
      const map = new Map()
      for (const obj of langStarsMap) {
        const currSum = map.get(obj["label"]) || 0
        map.set(obj["label"], currSum + obj["value"])
      }
      const res = Array.from(map, ([k, v]) => ({ ["label"]: k, ["value"]: v }))
      return res
    }

    // let starsMod = sumByKey()
    // console.log(starsMod)
    let jsonLangStarsData = JSON.stringify(sumByKey())
    let jsonLangStarsObj = JSON.parse(jsonLangStarsData)

    return jsonLangStarsObj
  }
  const jsonStarsData = convertLangStarData()

  const convertForksReposData = () => {
    let nameTemp = []
    let forksTemp = []
    repos.map((repo, index) => {
      const { name, forks_count } = repo
      if (name !== null) {
        nameTemp.push(name)
        forksTemp.push(forks_count)
      }
    })

    let forkReposMap = nameTemp.map((item, index) => {
      return { label: nameTemp[index], value: forksTemp[index] }
    })

    let forkReposMod = forkReposMap
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
    let jsonForkStarsData = JSON.stringify(forkReposMod)
    let jsonForkStarsObj = JSON.parse(jsonForkStarsData)

    return jsonForkStarsObj
  }
  const jsonForkStarData = convertForksReposData()

  const fetchRepos = async () => {
    let endPoints = []
    try {
      const response = await axios(`${rootUrl}${term}`)

      const { url, followers_url, repos_url } = response.data.items[0]
      const foll_url = `${followers_url}?page=1&per_page=1000`
      const repo_url = `${repos_url}?page=1&per_page=1000`
      endPoints.push(url, foll_url, repo_url)
      // axios
      //   .all(endPoints.map((endPoint) => axios.get(endPoint)))
      //   .then((data) => setUser(data))

      Promise.all(endPoints.map((endpoint) => axios.get(endpoint))).then(
        ([
          {
            data: user,
            headers: { "x-ratelimit-remaining": remain },
            headers: { "x-ratelimit-limit": limit }
          },
          { data: followers },
          { data: repos }
        ]) => {
          setUser(user)
          setRepos(repos)
          setFollowers(followers)
          setApiLimit({ limit: limit, remain: remain })
          setValue([])
          setLoading(false)
        }
      )
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <GithubContext.Provider
      value={{
        changeHandler,
        value,
        user,
        repos,
        followers,
        jsonObj,
        jsonReposData,
        jsonStarsData,
        jsonForkStarData,
        clickHandler,
        apiLimit,
        loading,
        error
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(GithubContext)
}

export { GithubContext, GithubProvider }
