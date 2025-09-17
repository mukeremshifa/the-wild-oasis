import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, stays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = stays.length;
  const occupation =
    stays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);

  return (
    <>
      <Stat
        title={'bookings'}
        color={'blue'}
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title={'sales'}
        color={'green'}
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title={'check ins'}
        color={'indigo'}
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title={'occupancy rate'}
        color={'yellow'}
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  );
}

export default Stats;
