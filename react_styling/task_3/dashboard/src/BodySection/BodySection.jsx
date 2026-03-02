import React from "react";

class BodySection extends React.Component {
    render() {
        const { title, children } = this.props
        return (
            <div className="bodySection mb-5">
                <h2 className="font-bold text-xl mt-8">
                    {title}
                </h2>
                {children}
            </div>
        )
    }
}

export default BodySection