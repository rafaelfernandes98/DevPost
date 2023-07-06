import { useNavigation } from "@react-navigation/native";
import { UserDocType } from "../../types/user";
import { Container, Name } from "./styles";
import { RouteProps } from "../../types/route";

type Props = {
  data: UserDocType
}

export function SearchList({ data }: Props): JSX.Element {
  const navigation = useNavigation<RouteProps>()

  return (
    <Container onPress={() => navigation.navigate('PostsUser', {title: data.nome, userId: data.id})}>
      <Name>{data.nome}</Name>
    </Container>
  )
}
