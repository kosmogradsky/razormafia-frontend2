import * as React from 'react';

export interface GameQueueFormProps {
  user: {
    id: string;
    email: string;
  }
}

export function GameQueueForm(props: GameQueueFormProps) {
  const [isQueueing, setIsQueueing] = React.useState<boolean>(false);

  React.useEffect(() => {
    
  }, [])
}