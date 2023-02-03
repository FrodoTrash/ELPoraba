import { defineStore } from "pinia";
import { Ientry, Imonthly } from "~~/types";
import useToast from "./useToast";

export const useEntryStore = defineStore('entry-store', {
  state: () => ({
    entries: [] as Ientry[],
    monthlies: [] as Imonthly[],
  }),
  actions: {
    async getAll() {
      try {
        let data = await $fetch<Ientry[]>('/api/entries');
        this.entries = data;
        return data as Ientry[];
      } catch (e: any) {
        useToast().error(e.message);
      }
    },
    async create(entry: Ientry) {
      await $fetch('/api/entries/create', {
        method: 'POST',
        body: entry
      })
      .catch((e) => {
        useToast().error(e.data.message);
      })
      .then(async () => {
        await this.getAll()
        await this.getMonthly()
        useToast().success('Uspesno ustvarjeno')
      })
    },
    async update(id: string, entry: Ientry) {
      await $fetch(`/api/entries/${id}`, {
        method: 'PUT',
        body: entry,
      })
      .catch((e) => {
        useToast().error(e.data.message);
      })
      .then(async () => {
        await this.getAll()
        await this.getMonthly()
        useToast().success('Uspesno posodobljeno')
      })
    },
    async remove(id: string) {
      await $fetch(`/api/entries/${id}`,{
        method: 'DELETE',
      })
      .catch((e) => {
        useToast().error(e.data.message);
      })
      .then(async () => {
        await this.getAll()
        await this.getMonthly()
        useToast().success('Uspesno izbrisano')
      }) 
    },
    async getMonthly() {
      try {
        let data = await $fetch<Imonthly[]>('/api/entries/monthly');
        this.monthlies = data;
        return data as Imonthly[];
      } catch (e: any) {
        useToast().error(e.message);
      }
    },
  }
})