import {ThreeCircles} from 'react-loader-spinner'
import PropTypes from 'prop-types'

const Loaders = ({loadertext}) => {
  return (
    <div className="w-auto h-auto text-center p-7">
          <div className='p-5 flex items-center justify-center'>
            <ThreeCircles
              visible={true}
              height="100"
              width="100"
              innerCircleColor="#ffffff"
              middleCircleColor="#152238"
              outerCircleColor="#0000FF"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
          <p className='md:text-2xl text-xl font-semibold'>{loadertext}</p>
        </div>
  )
}

Loaders.propTypes = {
  loadertext: PropTypes.string.isRequired
}

export default Loaders
