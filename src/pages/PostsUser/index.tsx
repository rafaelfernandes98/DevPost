
import { ActivityIndicator, Text, View } from 'react-native';
import { PostsUserParams } from '../../types/route';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useCallback, useContext, useLayoutEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore'
import { PostType } from '../../types/post';
import { Container, ListPosts } from './styles';
import { PostsList } from '../../components/PostsList';
import { AuthContext } from '../../contexts/auth';

export function PostsUser() {

  const route = useRoute()
  const navigation = useNavigation()
  const { user } = useContext(AuthContext)
  const { params } = route as PostsUserParams

  const [title, setTitle] = useState<string>(typeof params?.title === 'string' ? params?.title : '');
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(()=>{
    navigation.setOptions({
      title: title
    })
  }, [navigation, title])

  useFocusEffect(
    useCallback(()=>{
      let isActive = true

      firestore().collection('posts').where('userId', '==', params?.userId).orderBy('created', 'desc').get()
      .then((snapshot)=>{
        const postList: PostType[] = []

        snapshot.docs.map((u)=>{
          let data: PostType = {
            id: u.id,
            autor: u.data().autor,
            avatarUrl: u.data().avatarUrl,
            content: u.data().content,
            created: u.data().created,
            likes: u.data().likes,
            userId: u.data().userId
          }

          postList.push(data)
        })

        if(isActive){
          setPosts(postList)
          setLoading(false)
        }

      })

      return ()=>{
        isActive = false
      }
    },[])
  )

  return (
    <Container>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator
            size={50}
            color='#e52246'
          />
        </View>
      ) : (
        <ListPosts
          data={posts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (<PostsList data={item as PostType} userId={user?.uid} />)}
        />
      )}
    </Container>
  );
}
