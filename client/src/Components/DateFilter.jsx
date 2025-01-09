
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import {  FormControl, FormLabel} from '@mui/material';



const DateFilter=(props)=>{
 return (
         <LocalizationProvider  dateAdapter={AdapterDayjs}>
         <DemoContainer   components={['DateRangePicker']}>
        <DemoItem  component="DateRangePicker">
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <FormLabel sx={{ marginRight: 2,textAlign:'center' }}>Last update between:</FormLabel>
          <DateRangePicker 
          localeText={{ start: 'From', end: 'To' }}
            onChange={(newValue) => props.setDates(newValue)}
            slotProps={{
              shortcuts: {
                items: [{ label: 'Reset', getValue: () => [null,null ] }],
              },
            }}
            />
          </FormControl>
        </DemoItem>
      </DemoContainer>
       </LocalizationProvider>
      );
      
}
export default DateFilter