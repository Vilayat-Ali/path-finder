// lib
import { Helmet} from "react-helmet";

type Props = {
    title: string,
    keywords?: string[],
    description?: string
}

const SEO = (props: Props) => {
  return (
    <Helmet>
        <title>{props.title}</title>
        <meta name="keywords" content={props.keywords?.join(', ')} />
        <meta name="description" content={props.description} />
    </Helmet>
  )
}

export default SEO;