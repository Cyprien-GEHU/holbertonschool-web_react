import React from "react"

function WithLogging(WrappedComponent) {
    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component'
    
    return class extends React.Component {
        static displayName = `WithLogging(${wrappedComponentName})`
        
        componentDidMount() {
            console.log(`Component ${wrappedComponentName} is mounted`)
        }

        componentWillUnmount() {
            console.log(`Component ${wrappedComponentName} is going to unmount`)
        }
        
        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}

export default WithLogging