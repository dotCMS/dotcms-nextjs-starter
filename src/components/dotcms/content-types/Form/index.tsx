// Internals
import { FormWrapper } from './styles'

export const Form = ({ rendered }) => {
  return <FormWrapper dangerouslySetInnerHTML={{ __html: rendered }} />
}

export default Form
