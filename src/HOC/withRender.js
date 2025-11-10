import React from 'react';

function withRender(WrappedComponent){
    return class extends React.Component{
        Update(nextProps){
            if(nextProps.todo!==this.props.todo){
                return true;
            }
            return false;
        }
        render(){
            return <WrappedComponent {...this.props} />
        }
    };
}

export default withRender;