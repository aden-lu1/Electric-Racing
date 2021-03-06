/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import BulletList from './bullet-list';

describe('Bullet List Component', () => {
  it('renders the component title', () => {
    render(<BulletList title={'test'} headerRight={<></>} list={[<></>]} />);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('renders all bullets', () => {
    render(<BulletList title={'test'} headerRight={<></>} list={[<>one</>, <>two</>]} />);

    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
  });

  it('renders ordered list', () => {
    render(<BulletList title={'test'} headerRight={<></>} list={[<>one</>, <>two</>]} ordered />);

    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
  });
});
