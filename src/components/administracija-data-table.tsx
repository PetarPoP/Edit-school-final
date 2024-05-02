import { useDataStore } from "@/store.tsx";
import {
  IzbrisiRadionicu,
  UrediRadionicu,
} from "@/components/logika-radionici.tsx";
import {
  IzbrisiPredavaca,
  UrediPredavaca,
} from "@/components/logika-predavaci.tsx";
import {
  IzbrisiOrganizatora,
  UrediOrganizatora,
} from "@/components/logika-organizatori.tsx";

export function AdministracijaDataTable({ id }: { id: string }) {
  const storeData = useDataStore();

  return (
    <div>
      {id === "1" && (
        <div className="flex w-full flex-col gap-4 transition-all animate-fade-in-up">
          {storeData.workshops.map((workshop) => {
            return (
              <div
                key={workshop.id}
                className="flex items-center justify-between border-2 rounded-md p-2 w-full gap-4 bg-white dark:bg-black/30 dark:text-white transition-all"
              >
                <div className="w-full">{workshop.title}</div>
                <div className="w-full">{workshop.description}</div>
                <div className="w-full">{workshop.date}</div>
                <div className="w-full">
                  Broj prijava: {workshop.num_of_participants.length}
                </div>
                <div>
                  <UrediRadionicu workshop={workshop} />
                </div>
                <div>
                  <IzbrisiRadionicu workshop={workshop} />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {id === "2" && (
        <div className="flex w-full flex-col gap-4 transition-all animate-fade-in-up">
          {storeData.organizers.map((org) => {
            return (
              <div
                key={org.id}
                className="flex items-center justify-between border-2 rounded-md p-2 w-full gap-4 bg-white dark:bg-black/30 dark:text-white transition-all"
              >
                <div className="w-full">{org.name}</div>
                <div className="w-full">{org.description}</div>
                <div>
                  <UrediOrganizatora org={org} />
                </div>
                <div>
                  <IzbrisiOrganizatora org={org} />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {id === "3" && (
        <div className="flex w-full flex-col gap-4 transition-all animate-fade-in-up">
          {storeData.presenters.map((presenter) => {
            return (
              <div
                key={presenter.id}
                className="flex items-center justify-between border-2 rounded-md p-2 w-full gap-4 bg-white dark:bg-black/30 dark:text-white transition-all"
              >
                <div className="w-full">{presenter.name}</div>
                <div className="w-full">{presenter.description}</div>
                <div>
                  <UrediPredavaca presenter={presenter} />
                </div>
                <div>
                  <IzbrisiPredavaca presenter={presenter} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
