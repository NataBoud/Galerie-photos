import React, { useState, useEffect } from 'react'
import './index.scss'
import { Collection } from './Collection'

const cats = [
  { "name": "Tout" },
  { "name": "Mer" },
  { "name": "montagne" },
  { "name": "Architecture" },
  { "name": "Villes" }
]

function App() {
  const [categoryId, setCategoryId] = useState(0)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [collections, setCollections] = useState([])
 
  useEffect(() => {
    setIsLoading(true)

    const category = categoryId ? `category=${categoryId}` : ''
    // ?page=${page}&${category} => & разделяем URL => limit=3

    fetch(
      `https://649ac09ebf7c145d02396b2d.mockapi.io/collections?page=${page}&limit=6&${category}`
    )
    .then(res => res.json())
    .then(json => {
      setCollections(json)
    })
    .catch((err) => {
      console.warn(err)
      alert("Erreur lors de la réception de données !")
    }).finally(() => setIsLoading(false))
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>Ma collection de photos</h1>
      <div className="top">
        <ul className="tags">         
          {cats.map((obj, i) => (
            <li 
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? 'active' : ''} 
              key={obj.name}>{obj.name}
            </li>
          ))}
        </ul>
        <input 
          value={searchValue} 
          onChange={(e) => setSearchValue(e.target.value)} 
          className="search-input" 
          placeholder="Rechercher par titre" 
        />
      </div>
      <div className="content">
       {isLoading ? (<h2>Chargement de la page...</h2>
       ) : (
        collections
          .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map((obj, index) => (
            <Collection
              key={index}
              name={obj.name}
              images={obj.photos}
            />
          ))
       )}
      </div>
      <ul className="pagination">
        {
          [...Array(3)].map((_, i) => (
            <li onClick={() => setPage(i + 1)} className={ page === (i + 1) ? 'active' : '' }>{ i + 1 }</li>
          ))
        }
      </ul>
    </div>
  )
}

export default App

// Создаем комп. <Collection/> в новом файле и импортируем его import { Collection } from './Collection' сюда

// **** 1. Запрашиваем при первом рендере данные с моей созданной базы данных вот отсюда -  https://649a9296bf7c145d02390a54.mockapi.io/collections

// data -  https://mockapi.io/projects/649a9296bf7c145d02390a55

// api photos - https://unsplash.com/developers

// **** 2. инфу сохраняем в state

// fetch - забирать, выбирать useEffect(() => {fetch('https://649a9296bf7c145d02390a54.mockapi.io/collections')
    // .then(res => res.json()) }) .......

// Теперь надо все это отрендерить - используем .map()

// Внутрь комп. <Collection/> передаем данные -  массив с фото и название из дата

// 3. делаем state => const [searchValue, setSearchValue] = useState('')
//  4. Делаем конторолируемый инпут => 
// value={searchValue} onChahge={(событие) => setSearchValue(событие.цель.value)}
// value={searchValue} onChahge={(e) => setSearchValue(e.target.value)} 

// 5. далее фильтрацию:  .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))

// 6. Теперь делаем фильтрацию по категории => const [categoryId, setCategoryId] = useState(0) - 0 выбраны все категории

// 7. создаем перем. cats берем ее из data.json и изм <li> => {cats.map(obj => <li key={obj.name}>{obj.name}</li>)} - добавл kеy тк object всегда уникальный

// НУЖНО ПОНЯТЬ КАКАЯ КАТЕГ ВЫБРАНА:
// если доб className='active' то все катег активны - черный цв => делаем условие className={categoryId === i ? 'active' : ''} - если categoryId равно/совпадает с i (индексом этой катег), то перед актив класс если нет, то пустой класс

// 8. Теперь при клике на катег ее надо делать активной - делаем onClick={() => setCategoryId(i)}

// 9. Теперь когда кликаю на катег море(например) мне нужно отпр запрос на backend и нужно найти все категории у которых есть id море(например)

// Поиск по катег а mockapi - https://649ac09ebf7c145d02396b2d.mockapi.io/collections?category=1 - добвл - ?category=1 

// 10. В зависимостях ,[] передаем сategoryId => меняем ссылку fetch(`https://649ac09ebf7c145d02396b2d.mockapi.io/collections?`) и в ссылке пеишем условие

// 11. Объясняем пользователю, что сейчас идет загрузка => создаем новый state const [isLoading, setIsLoading] = useState(true) => добавл изм. {isLoading ? (<h2>Chargement de la page... => но теперь они просноянно видны => добавл. finally() к фетчу => объясняем, что как только Promise завершился мы делаем setLoading - false **** НО когда я перехожу на др катег chargement de la page... не появл => добавл выше фетча setIsLoading(true)

// 12. PAGINATION
// в дате mockapi -https://649ac09ebf7c145d02396b2d.mockapi.io/collections?page=2&limit=3 => pagination => ?page=2&limit=3 - пример как отображается (из их докум-ции) => передаем page и limite

// !!!!! mockapi это не идеальный способ чтобы делать backend и он не умеет идеально выдавать все данные это тестовый сервер он не отобразит все стр и даст всю информацию сколько чего отобразилось

// <li>1</li>
//  <li className="active">2</li>
// <li>3</li>  - меняем эту чать => условно говорим нам нужно создать 5 стр создаем 5 фейковых элементов в массиве {[...Array(5)]} - ЭТО НЕ ИДЕАЛЬНЫЙ СПОСОБ! => пробегаемся по каждому элементу .map() и его рендерим {[...Array(5)].map((_, i) => <li>1</li>)} и берем его кажд индекс ****(_, i)

// Далее делаем ту же логику как и в категориях <li onClick={() => setPage(i)} className={ page === i ? 'active' : '' }>{ i + 1 }</li>

// 13. Теперь если я выбираю какую-то стр, то поней нужно делать фильтрацию => переходим в фетч
 