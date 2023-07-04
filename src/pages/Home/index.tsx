import { ActivityIndicator, Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import { Container, ButtonPost, ListPosts } from './styles';
import { CompositeNavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { Header } from '../../components/Header';
import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import firestore from '@react-native-firebase/firestore'
import { PostsList } from '../../components/PostsList';

export function Home() {
  const navigation = useNavigation()
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [lastItem, setLastItem] = useState({});
  const [emptyList, setEmptyList] = useState(false);

  useFocusEffect(
    useCallback(()=>{
      let isActive = true

      function fetchPosts(){
        firestore().collection('posts').orderBy('created', 'desc').limit(5).get()
        .then((snapshot)=>{
          if (isActive){
            setPosts([])
            const postList: any[] = []

            snapshot.docs.map(u =>{
              postList.push({
                ...u.data(),
                id: u.id
              })
            })

            setEmptyList(!!snapshot.empty)
            setPosts(postList)
            setLastItem(snapshot.docs[snapshot.docs.length -1])
            setLoading(false)
          }
        })
      }

      fetchPosts()

      return ()=>{
        isActive = false
      }
    },[])
  )


  function handleRefreshPosts(){
    setLoadingRefresh(true)

    firestore().collection('posts').orderBy('created', 'desc').limit(5).get()
      .then((snapshot) => {
          setPosts([])
          const postList: any[] = []

          snapshot.docs.map(u => {
            postList.push({
              ...u.data(),
              id: u.id
            })
          })

          setEmptyList(false)
          setPosts(postList)
          setLastItem(snapshot.docs[snapshot.docs.length - 1])
          setLoading(false)
      })

      setLoadingRefresh(false)
  }

  async function getListPosts(){
    if(emptyList){
      setLoading(false)
      return null
    }

    if(loading) return

    firestore().collection('posts')
    .orderBy('created', 'desc')
    .limit(5)
    .startAfter(lastItem)
    .get()
    .then((snapshot)=>{
      const postList: any[] = []

      snapshot.docs.map(u => {
        postList.push({
          ...u.data(),
          id: u.id
        })
      })

      setEmptyList(!!snapshot.empty)
      setLastItem(snapshot.docs[snapshot.docs.length - 1])
      setPosts(oldPosts => [...oldPosts, ...postList])
      setLoading(false)
    })
  }

  return (
    <Container>
      <Header />

    {loading ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={50} color='#e52246'/>
      </View>
    ): (
      <>
        <ListPosts
          data={posts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PostsList data={item} userId={user?.uid}/>
          )}
          refreshing={loadingRefresh}
          onRefresh={handleRefreshPosts}
          onEndReached={() => getListPosts()}
          onEndReachedThreshold={0.1}
        />
        <ButtonPost
          activeOpacity={0.8}
          onPress={() => navigation.navigate('NewPost' as never)}
        >
          <Feather
            name='edit-2'
            color='#fff'
            size={25}
          />
        </ButtonPost>
      </>
    )}
    </Container>
  );
}
