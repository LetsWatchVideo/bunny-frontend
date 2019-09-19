import Layout from '../components/layout';
import pulse from '../lib/pulse';

const IndexPage = (props) => {
  const { something } = props.pulse;

  return (
    <Layout>
      <div>Hello World.</div>
      <div>{JSON.stringify(props.pulse)}</div>
    </Layout>
  );
}

IndexPage.getInitialProps = ({ req }) => {
  console.log('req');
  pulse.posts.getPosts();
  return { dab: true }
}

export default pulse.wrapped(IndexPage, (props) => {
  console.log('byby', props.posts.homepage);
  return {
    posts: props.posts.homepage
  }
});
