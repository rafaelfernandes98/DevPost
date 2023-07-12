import { render } from '@testing-library/react-native'
import { Header } from '.'

describe('<Header />', ()=>{
  it('render component', ()=>{
    render(
      <Header />
    )
  })
})
