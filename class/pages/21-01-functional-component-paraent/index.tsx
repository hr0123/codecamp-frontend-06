import FunctionalComponentChildPage from "../21-02-functional-component-child/index";

export default function FunctionalComponentParentPage() {
  // return <FunctionalComponentChildPage count={123} />;
  return <>{FunctionalComponentChildPage({ count: 123 })}</>;
}
