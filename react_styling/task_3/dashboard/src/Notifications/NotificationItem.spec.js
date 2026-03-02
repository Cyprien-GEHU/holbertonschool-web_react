import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotificationItem from './NotificationItem.jsx';

afterEach(() => {
  jest.restoreAllMocks()
})

test('should called the prop function on click event', async () => {
  const mockProp = jest.fn()

  render(<NotificationItem type="urgent" value="New resume available" markAsRead={mockProp} />);

  const item = screen.getByRole('listitem');
  const user = userEvent.setup()
  await user.click(item)

  expect(mockProp).toHaveBeenCalledTimes(1)
})