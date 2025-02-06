import { eachMonthOfInterval, endOfYear, format, startOfMonth, startOfYear } from 'date-fns'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

type Props = {
  selectedMonth: Date
  onChange: (month: Date) => void
}

export const MonthDropdown = ({ selectedMonth, onChange }: Props) => {
  const months = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date()),
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{format(selectedMonth, 'MMMM')}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={startOfMonth(selectedMonth).toISOString()}
          onValueChange={isoDate => {
            onChange(new Date(isoDate))
          }}
        >
          {months.map(month => (
            <DropdownMenuRadioItem key={month.toISOString()} value={startOfMonth(month).toISOString()}>
              {format(month, 'MMMM')}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
