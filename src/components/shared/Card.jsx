import PropTypes from 'prop-types'

function Card({children, reverse}) {
    // console.log(children)
//   return (
//     <div className={`card ${reverse&&'reverse'}`}>
//       {children}
//     </div>
//   )
    return (
        <div className={`card ${reverse&&'reverse'}`}>
            {children}
        </div>
    )
}

Card.defaultProps = {
    reverse: false
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
    reverse: PropTypes.bool,
}

export default Card
