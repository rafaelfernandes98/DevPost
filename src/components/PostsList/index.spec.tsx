import { render } from '@testing-library/react-native'
import { PostsList } from '.'

describe('<PostsList />', () => {
  it('render component', () => {

    const data ={
      id: '1',
      autor: 'Author default',
      avatarUrl: '',
      content: 'Description default',
      created: {
        seconds: 1231234,
        nanoseconds: 1231234
      },
      likes: 12,
      userId: '123',
    }

    render(
      <PostsList data={data} />
    )
  })
})
