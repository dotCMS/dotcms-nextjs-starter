// Internals
import { FormWrapper } from './styles'

import { htmlParser } from '@/utils'

export type FormProps = {
  rendered: string
}

export const Form = ({ rendered }: FormProps) => {
  return (
    <FormWrapper>
      {htmlParser({ content: rendered }) as JSX.Element}
    </FormWrapper>
  )
}

export default Form
