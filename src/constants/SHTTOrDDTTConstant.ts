import { createConstant } from './Constant'
const SHTTOrDDTTConstant = createConstant(
  {
    SHTT: 'SHTT',
    DDTT: 'DDTT',
  },
  {
    'SHTT': { displayName: 'Sở hữu trí tuệ' },
    'DDTT': { displayName: 'Đại diện thương hiệu' },
  }
)
export default SHTTOrDDTTConstant
