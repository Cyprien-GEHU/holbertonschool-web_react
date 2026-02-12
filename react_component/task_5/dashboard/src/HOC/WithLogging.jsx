import React from "react";

function WithLogging(WrapCompo) {
  return class extends React.Component {
    static displayName = `WithLogging(${WrapCompo.name || "Component"})`;

    componentDidMount() {
      console.log(`${WrapCompo.name || "Component"} mounted`);
    }
    componentWillUnmount() {
      console.log(`${WrapCompo.name || "Component"} will unmount`);
    }
    render() {
      const ComponentToRender = WrapCompo;
      return <ComponentToRender {...this.props} />;
    }
  };
}

export default WithLogging;
