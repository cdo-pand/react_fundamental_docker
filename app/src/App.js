import React, {useState, useEffect} from 'react';
import {usePosts} from "./hooks/usePosts"
import '../src/styles/App.css';
import PostService from "./API/PostService";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from './components/UI/modal/MyModal'
import MyButton from './components/UI/button/MyButton'

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    // будет вызван 1 раз, при первичной отрисовке компонента.
    useEffect(() => {
        fetchPosts()
    }, [])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    // получить посты у тестового API (асинхронно)
    async function fetchPosts() {
        const posts = await PostService.getAll()
        setPosts(posts)
    }

    // Получаем post из дочернего элемента
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            {/*<Counter/>*/}
            {/*<ClassCounter/>*/}

            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>

            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Список постов"}/>
        </div>
    );
}

export default App;
