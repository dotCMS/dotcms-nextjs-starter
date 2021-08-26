// Internals
import { FormWrapper } from './styles'

export type FormProps = {
  rendered: string
}

export const Form = ({ rendered }: FormProps) => {
  return <FormWrapper dangerouslySetInnerHTML={{ __html: rendered }} />
}

export default Form
