"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { IconCalendar } from "@tabler/icons-react";
import {
  addDays,
  addYears,
  format,
  setMonth,
  setYear,
  subYears,
} from "date-fns";
import { parse } from "path";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export function AccountForm() {
  const form = useForm();
  function onSubmit() {
    console.log("submit");
  }

  const [birthDate, setBirthDate] = React.useState<Date>(new Date());

  // Years array ()
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 90 }, (_, i) => currentYear - i - 10);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-x-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Jhon" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de famille</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date de naissance</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Choisissez une date</span>
                      )}
                      <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2" align="start">
                  <div className="grid grid-cols-2 gap-x-2">
                    <Select
                      onValueChange={(value) =>
                        setBirthDate(setYear(birthDate, parseInt(value)))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Année" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      onValueChange={(value) =>
                        setBirthDate(setMonth(birthDate, parseInt(value)))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Mois" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="0">Janvier</SelectItem>
                        <SelectItem value="1">Février</SelectItem>
                        <SelectItem value="2">Mars</SelectItem>
                        <SelectItem value="3">Avril</SelectItem>
                        <SelectItem value="4">Mai</SelectItem>
                        <SelectItem value="5">Juin</SelectItem>
                        <SelectItem value="6">Juillet</SelectItem>
                        <SelectItem value="7">Août</SelectItem>
                        <SelectItem value="8">Septembre</SelectItem>
                        <SelectItem value="9">Octobre</SelectItem>
                        <SelectItem value="10">Novembre</SelectItem>
                        <SelectItem value="11">Décembre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    month={birthDate}
                    onMonthChange={setBirthDate}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Votre date de naissance ne sera pas affichée publiquement.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Mettre à jour le compte</Button>
      </form>
    </Form>
  );
}
