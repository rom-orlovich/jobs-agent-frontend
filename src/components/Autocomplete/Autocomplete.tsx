import { useState } from 'react';
import { Combobox } from '@headlessui/react';
const people = [
  'Durward Reynolds',
  'Kenton Towne',
  'Therese Wunsch',
  'Benedict Kessler',
  'Katelyn Rohan'
];

export default function Autocomplete({ setValue }: { setValue?: (value: string) => void }) {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      value={selectedPerson}
      onChange={(value) => {
        setValue && setValue(value);
        setSelectedPerson(value);
      }}
    >
      <div>
        <Combobox.Input className="input-custom" onChange={(event) => setQuery(event.target.value)} />

        <div className="relative ">
          <Combobox.Options
            className={'absolute z-50 flex w-full flex-col items-center bg-slate-100 shadow-md'}
          >
            {filteredPeople.map((person) => (
              <Combobox.Option key={person} value={person}>
                {({}) => {
                  return <div>{person} </div>;
                }}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </div>
    </Combobox>
  );
}
