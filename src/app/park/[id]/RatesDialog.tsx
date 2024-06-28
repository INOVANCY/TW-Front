import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconExclamationCircle } from "@tabler/icons-react";
import { useEffect } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Rate = {
  year: number;
  adultPrice: number;
  childPrice: number;
  specialPrice: number;
  isEntranceFree: boolean;
  offersDiscounts: boolean;
  offersEarlyBird: boolean;
  _id: string;
};

interface RatesDialogProps {
  parkName: string;
  rates: Rate[];
}

export default function RatesDialog({ rates, parkName }: RatesDialogProps) {
  console.log(rates);
  return (
    <li>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" size="link">
            Voir l&apos;historique
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Historique des tarifs de {parkName}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 border pt-2 pr-2 rounded-md">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={rates}>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F20A0A" stopOpacity={0.4} />
                    <stop offset="75%" stopColor="#F2195C" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="year"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => {
                    return `${Intl.NumberFormat("fr-FR").format(value)}€`;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="adultPrice"
                  stroke="#F20A0A"
                  fillOpacity={1}
                  fill="url(#gradient)"
                />
                <Area
                  type="monotone"
                  dataKey="childPrice"
                  stroke="#F20A0A"
                  fill="url(#gradient)"
                />
                <Area
                  type="monotone"
                  dataKey="specialPrice"
                  stroke="#F20A0A"
                  fill="url(#gradient)"
                />
                <Tooltip
                  cursor={{ fill: "F20A0A", radius: 4, stroke: "e2e8f0" }}
                  content={({ active, payload }) => {
                    if (!active || !payload || payload.length === 0)
                      return null;
                    return (
                      <div className="bg-card rounded-md shadow-md p-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground uppercase">
                              Année
                            </span>
                            <span className="text-sm font-bold">
                              {payload[0].payload.year}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground uppercase">
                              Adulte
                            </span>
                            <span className="text-sm font-bold">
                              {Intl.NumberFormat("fr-FR").format(
                                payload[0].payload.adultPrice
                              )}
                              €
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground uppercase">
                              Enfant
                            </span>
                            <span className="text-sm font-bold">
                              {Intl.NumberFormat("fr-FR").format(
                                payload[0].payload.childPrice
                              )}
                              €
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm uppercase text-muted-foreground">
                              Tarif spécial
                            </span>
                            <span className="text-sm font-bold">
                              {Intl.NumberFormat("fr-FR").format(
                                payload[0].payload.specialPrice
                              )}
                              €
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                />
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  vertical={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground p-2">
            Attention: ces tarifs sont donnés à titre indicatif et peuvent
            varier en fonction de la saison et des événements.
          </p>
        </DialogContent>
      </Dialog>
    </li>
  );
}
